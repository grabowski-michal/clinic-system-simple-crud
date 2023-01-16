/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package pai.project.repository;

import java.util.ArrayList;
import org.springframework.data.repository.CrudRepository;
import pai.project.domain.Doctor;

/**
 *
 * @author Michal_Grabowski
 */
public interface DoctorRepository extends CrudRepository<Doctor, Integer> {
    ArrayList<Doctor> findByDepartment(String department); 
    Doctor findById(long id); 
}
