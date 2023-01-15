/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pai.project.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pai.project.config.JwtTokenUtil;
import pai.project.domain.Appointment;
import pai.project.domain.Doctor;
import pai.project.domain.User;
import pai.project.model.AddressDto;
import pai.project.model.AppointmentDto;
import pai.project.model.JwtCreateAppointmentRequest;
import pai.project.model.JwtDeleteAppointmentRequest;
import pai.project.model.JwtRequest;
import pai.project.model.JwtResponse;
import pai.project.model.JwtUpdateAddressRequest;
import pai.project.model.JwtUpdatePasswordRequest;
import pai.project.model.JwtUpdateUserRequest;
import pai.project.model.UserDto;
import pai.project.repository.AppointmentRepository;
import pai.project.repository.DoctorRepository;
import pai.project.repository.UserRepository;
import pai.project.service.JwtUserDetailsService;

/**
 *
 * @author Michal_Grabowski
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AppController {
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @RequestMapping({ "/hello" })
    public String welcomePage() {
        return "Welcome!";
    }
    
    @GetMapping("/getUserInfo")
    @ResponseBody
    public ResponseEntity<User> getUserInfo(@RequestParam("token") String token) {
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = new User();
        if (!username.isEmpty()) {
            user = userRepository.findByUsername(username);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @PutMapping("/alterUser")
    @ResponseBody
    public ResponseEntity<Integer> updateUser (@RequestBody JwtUpdateUserRequest json) {
        String token = json.getToken();
        UserDto user = json.getUser();
    
        String username = jwtTokenUtil.getUsernameFromToken(token);
        Integer response = 0;
        if (!username.isEmpty() && userRepository.findByUsername(username) != null) {
            response = userDetailsService.update(user);
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }        
    }
    
    @PutMapping("/alterAddress")
    @ResponseBody
    public ResponseEntity<Integer> updateAddress (@RequestBody JwtUpdateAddressRequest json) {
        String token = json.getToken();
        AddressDto address = json.getAddress();
    
        String username = jwtTokenUtil.getUsernameFromToken(token);
        Integer response = 0;
        if (!username.isEmpty() && userRepository.findByUsername(username) != null) {
            response = userDetailsService.updateAddress(address);
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }        
    }
    
    @PutMapping("/alterPassword")
    @ResponseBody
    public ResponseEntity<Integer> updatePassword (@RequestBody JwtUpdatePasswordRequest json) {
        String token = json.getToken();
        String oldPassword = json.getOldPassword();
        String newPassword = json.getNewPassword();
    
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User u = userRepository.findByUsername(username);
        Integer response = 0;
        if (!username.isEmpty() && u != null) {
            if (!userDetailsService.checkPassword(username, oldPassword)) {
                return new ResponseEntity<>(-1, HttpStatus.NOT_MODIFIED);
            }
            response = userDetailsService.updatePassword(newPassword, u.getId());
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }        
    }
    
    @GetMapping("/getDoctors")
    @ResponseBody
    public ResponseEntity<ArrayList<Doctor>> getDoctorsFromDepartment(@RequestParam("token") String token,
                                                        @RequestParam("department") String department) {
        String username = jwtTokenUtil.getUsernameFromToken(token);
        ArrayList<Doctor> doctors = new ArrayList<Doctor>();
        if (!username.isEmpty()) {
            doctors = doctorRepository.findByDepartment(department);
        }
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }
    
    @GetMapping("/getAppointments")
    @ResponseBody
    public ResponseEntity<ArrayList<Appointment>> getAppointments(@RequestParam("token") String token) {
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User u = userRepository.findByUsername(username);
        ArrayList<Appointment> apps = new ArrayList<Appointment>();
        if (!username.isEmpty() && u != null) {
            apps = appointmentRepository.findByUserId(u.getId());
        }
        return new ResponseEntity<>(apps, HttpStatus.OK);
    }
    
    @PostMapping("/makeAppointment")
    @ResponseBody
    public ResponseEntity<?> makeAppointment (@RequestBody JwtCreateAppointmentRequest json) {
        String token = json.getToken();
        AppointmentDto appointment = json.getAppointment();
    
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        Appointment response;
        if (!username.isEmpty() && user != null) {
            appointment.setUserId(user.getId());
            response = userDetailsService.insertAppointment(appointment);
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }        
    }
    
    @DeleteMapping("/cancelAppointment")
    @ResponseBody
    public ResponseEntity<Integer> deleteAppointment (@RequestBody JwtDeleteAppointmentRequest json) {
        String token = json.getToken();
        long id = json.getId();
    
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User u = userRepository.findByUsername(username);
        Integer response = 0;
        if (!username.isEmpty() && u != null) {
            response = appointmentRepository.deleteById(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }        
    }
}
