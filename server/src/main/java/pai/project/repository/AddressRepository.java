/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package pai.project.repository;

import org.springframework.data.repository.CrudRepository;
import pai.project.domain.Address;

/**
 *
 * @author Michal_Grabowski
 */
public interface AddressRepository extends CrudRepository<Address, Integer>{
    
}
