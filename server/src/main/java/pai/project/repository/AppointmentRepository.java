/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package pai.project.repository;

import java.util.ArrayList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import pai.project.domain.Appointment;
import pai.project.domain.Doctor;

/**
 *
 * @author Michal_Grabowski
 */
public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
    ArrayList<Appointment> findByUserId(long userId);
    
    @Transactional
    Integer deleteById(long id);
}

