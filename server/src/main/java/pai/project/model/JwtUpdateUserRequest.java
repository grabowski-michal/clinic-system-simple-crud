/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pai.project.model;

import java.io.Serializable;

/**
 *
 * @author Michal_Grabowski
 */
public class JwtUpdateUserRequest implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String token;
    private final UserDto user;
    
    public JwtUpdateUserRequest(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }
    
    public String getToken() {
        return this.token;
    }
    
    public UserDto getUser() {
        return this.user;
    }
    
    
}
