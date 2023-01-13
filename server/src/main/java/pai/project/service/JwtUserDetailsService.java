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
import pai.project.domain.User;
import pai.project.repository.AddressRepository;

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
