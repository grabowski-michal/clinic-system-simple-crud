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
public class JwtUpdateAddressRequest implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String token;
    private final AddressDto address;
    
    public JwtUpdateAddressRequest(String token, AddressDto address) {
        this.token = token;
        this.address = address;
    }
    
    public String getToken() {
        return this.token;
    }
    
    public AddressDto getAddress() {
        return this.address;
    }
    
    
}
