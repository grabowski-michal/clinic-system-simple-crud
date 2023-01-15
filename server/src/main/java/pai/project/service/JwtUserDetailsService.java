package pai.project.service;
        
import pai.project.model.UserDto;
import pai.project.repository.UserRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pai.project.domain.Address;
import pai.project.domain.Appointment;
import pai.project.domain.User;
import pai.project.model.AddressDto;
import pai.project.model.AppointmentDto;
import pai.project.repository.AddressRepository;
import pai.project.repository.AppointmentRepository;

/**
 *
 * @author Michal_Grabowski
 */

@Service
public class JwtUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AddressRepository addressRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private PasswordEncoder bcryptEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                        new ArrayList<>());
    }
    
    public Integer updateAddress(AddressDto address) {
        return addressRepository.updateAddress(address.getStreet(), address.getPostalCode(), address.getCity(), address.getState(),
                                         address.getCountry(), address.getId());
    }
    
    public Integer update(UserDto user) {
        return userRepository.updateUser(user.getFirstName(), user.getLastName(), user.getPhone(), user.getEmail(),
                                         user.getBirthDate(), user.getIdCard(), user.getId());
    }
    
    public boolean checkPassword(String username, String password) {
        User u = userRepository.findByUsername(username);
        String encoded = bcryptEncoder.encode(password);
        
        return bcryptEncoder.matches(password, u.getPassword());
    }
    
    public Integer updatePassword(String password, long id) {
        return userRepository.updatePassword(bcryptEncoder.encode(password), id);
    }
    
    public Appointment insertAppointment (AppointmentDto appointment) {
        Appointment newApp = new Appointment();
        newApp.setUserId(appointment.getUserId());
        newApp.setDoctorId(appointment.getDoctorId());
        newApp.setAppointmentDate(appointment.getAppointmentDate());
        newApp.setAppointmentTime(appointment.getAppointmentTime());
        newApp.setReason(appointment.getReason());
        newApp.setAdditionalMessage(appointment.getAdditionalMessage());
        
        return appointmentRepository.save(newApp);
    }
    
    public User save(UserDto user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setIdCard(user.getIdCard());
        newUser.setPhone(user.getPhone());
        newUser.setBirthDate(user.getBirthDate());
        
        Address newAddress = new Address();
        newAddress.setStreet(user.getAddress().getStreet());
        newAddress.setState(user.getAddress().getState());
        newAddress.setCountry(user.getAddress().getCountry());
        newAddress.setPostalCode(user.getAddress().getPostalCode());
        newAddress.setCity(user.getAddress().getCity());
        
        addressRepository.save(newAddress);
        newUser.setAddress(newAddress);
        return userRepository.save(newUser);
    }
}
