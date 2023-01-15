/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package pai.project.repository;

import java.util.Date;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import pai.project.domain.Address;

/**
 *
 * @author Michal_Grabowski
 */
public interface AddressRepository extends CrudRepository<Address, Integer>{
    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.street=:street, a.postalCode=:postalCode, "
            + "a.city=:city, a.state=:state, a.country=:country WHERE a.id=:id")
    public Integer updateAddress(@Param("street") String street, @Param("postalCode") String postalCode, @Param("city") String city,
                          @Param("state") String state, @Param("country") String country, @Param("id") long id);
}
