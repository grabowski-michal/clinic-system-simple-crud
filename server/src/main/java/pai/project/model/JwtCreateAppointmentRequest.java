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
public class JwtCreateAppointmentRequest implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String token;
    private final AppointmentDto appointment;
    
    public JwtCreateAppointmentRequest(String token, AppointmentDto appointment) {
        this.token = token;
        this.appointment = appointment;
    }
    
    public String getToken() {
        return this.token;
    }
    
    public AppointmentDto getAppointment() {
        return this.appointment;
    }
    
    
}
