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
public class JwtDeleteAppointmentRequest implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String token;
    private final long id;
    
    public JwtDeleteAppointmentRequest(String token, long id) {
        this.token = token;
        this.id = id;
    }
    
    public String getToken() {
        return this.token;
    }
    
    public long getId() {
        return this.id;
    }    
}
