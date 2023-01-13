package pai.project.service;
        
import pai.project.model.UserDao;
import pai.project.model.UserDto;
import pai.project.repository.UserRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User; 
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author Michal_Grabowski
 */

@Service
public class JwtUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder bcryptEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDao user = userRepository.findByUsername(username);
        if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                        new ArrayList<>());
    }
    
    public UserDao save(UserDto user) {
            UserDao newUser = new UserDao();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            return userRepository.save(newUser);
    }
}
