package pai.project.repository;

import org.springframework.data.repository.CrudRepository;
import pai.project.domain.User;

/**
 *
 * @author Michal_Grabowski
 */

public interface UserRepository extends CrudRepository<User, Integer>{
    User findByUsername(String username); 
}
