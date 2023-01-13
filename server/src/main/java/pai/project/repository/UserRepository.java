package pai.project.repository;

import pai.project.model.UserDao;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Michal_Grabowski
 */

public interface UserRepository extends CrudRepository<UserDao, Integer>{
    UserDao findByUsername(String username); 
}
