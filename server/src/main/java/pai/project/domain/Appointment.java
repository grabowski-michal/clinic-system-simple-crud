/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pai.project.domain;

import java.sql.Time;
import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Getter @Setter
    @NotBlank(message = "Appointment Date cannot be blank")
    private Date appointmentDate;
    
    @Getter @Setter
    @NotBlank(message = "Appointment Time cannot be blank")
    private String appointmentTime;
    
    @Getter @Setter
    private String reason;
    
    @Getter @Setter
    private String additionalMessage;
    
    @Getter @Setter
    private long doctorId;
    
    @Getter @Setter
    private long userId;
}
