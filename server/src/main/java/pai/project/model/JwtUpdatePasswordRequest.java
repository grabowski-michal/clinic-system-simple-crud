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
public class JwtUpdatePasswordRequest implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String token;
    private final String oldPassword;
    private final String newPassword;
    
    public JwtUpdatePasswordRequest(String token, String oldPassword, String newPassword) {
        this.token = token;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
    
    public String getToken() {
        return this.token;
    }
    
    public String getOldPassword() {
        return this.oldPassword;
    }
    
        public String getNewPassword() {
        return this.newPassword;
    }
    
    
}
