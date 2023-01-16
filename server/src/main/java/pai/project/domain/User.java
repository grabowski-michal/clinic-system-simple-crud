/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pai.project.domain;

import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

/**
 *
 * @author Michal_Grabowski
 */

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @Getter @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Getter @Setter
    @NotBlank(message = "Username cannot be blank")
    @Column(unique=true)
    private String username;
    @Getter @Setter
    @JsonIgnore
    @NotBlank(message = "Password cannot be blank")
    private String password;
    @Getter @Setter
    @NotBlank(message = "Name cannot be blank")
    private String firstName;
    @Getter @Setter
    @NotBlank(message = "Name cannot be blank")
    private String lastName;
    @Getter @Setter
    @Email(message = "Email is not valid", regexp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")
    @NotBlank(message = "Email cannot be blank")
    private String email;
    @Getter @Setter
    @Column(unique=true)
    @NotBlank(message = "ID Card cannot be blank")
    private String idCard;
    @Getter @Setter
    @NotBlank(message = "Phone cannot be blank")
    private String phone;
    @Getter @Setter
    private Date birthDate;
    
    @Getter @Setter
    @JoinColumn(name="address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    
    @Getter @Setter
    @JoinColumn(name="userId")
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Appointment> appointments;
}
