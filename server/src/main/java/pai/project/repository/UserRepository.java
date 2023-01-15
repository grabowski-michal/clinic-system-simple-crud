package pai.project.repository;

import java.util.Date;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import pai.project.domain.User;

/**
 *
 * @author Michal_Grabowski
 */

public interface UserRepository extends CrudRepository<User, Integer>{
    User findByUsername(String username); 
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.firstName=:firstName, u.lastName=:lastName, "
            + "u.phone=:phone, u.email=:email, u.birthDate=:birthDate, u.idCard=:idCard WHERE u.id=:id")
    public Integer updateUser(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("phone") String phone,
                          @Param("email") String email, @Param("birthDate") Date birthDate, @Param("idCard") String idCard,
                                                    @Param("id") long id);
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password=:password WHERE u.id=:id")
    public Integer updatePassword(@Param("password") String password, @Param("id") long id);
}
