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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Michal_Grabowski
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Getter @Setter
    @NotBlank(message = "First Name cannot be blank")
    private String firstName;
    @Getter @Setter
    @NotBlank(message = "Last Name cannot be blank")
    private String lastName;
    @Getter @Setter
    @NotBlank(message = "Phone cannot be blank")
    private String phone;
    @Getter @Setter
    @NotBlank(message = "Email cannot be blank")
    private String email;
    @Getter @Setter
    @Column(unique=true)
    @NotBlank(message = "ID Card cannot be blank")
    private String idCard;
    @Getter @Setter
    private String department;
    @Getter @Setter
    private Date birthDate;
    @Getter @Setter
    private String description;
    
    @Getter @Setter
    @JoinColumn(name="address_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    
    @ManyToMany
    @JoinTable(
        name = "DoctorSpecialization",
        joinColumns = @JoinColumn(name = "doctorId"),
        inverseJoinColumns = @JoinColumn(name = "specializationId")
    )
    Set<Specialization> specializations;
    
    @Getter @Setter
    @JoinColumn(name="doctorId")
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Appointment> appointments;
    
}
