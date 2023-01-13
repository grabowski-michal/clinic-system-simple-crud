/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pai.project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private UserDetailsService jwtUserDetailsService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter; 
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
                                                throws Exception {
        // Konfiguracja menadżera AuthenticationManager, aby wiedział skąd
        // pobrać dane użytkownika do sprawdzenia
        // Haszowania hasła BCryptPasswordEncoder
        auth.userDetailsService(jwtUserDetailsService).
            passwordEncoder(passwordEncoder());
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    } 
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean()
                                        throws Exception {
        return super.authenticationManagerBean();
    }
    
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        
        // W przykładzie nie ma potrzeby stosowania zabezpieczenia przed CSRF
        httpSecurity.csrf().disable()
        // poniższe żądanie nie wymaga uwierzytelniania
            .authorizeRequests().antMatchers("/authenticate", "/register")
            .permitAll()
            // wszystkie pozostałe żądania wymagają uwierzytelniania
            .anyRequest().authenticated().and()
            // sesja jest bezstanowa, nie przechowuje stanu użytkownika
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        // Dodanie filtra w celu walidacji tokena dla każdego żądania
        httpSecurity.addFilterBefore(jwtRequestFilter,
        UsernamePasswordAuthenticationFilter.class);
    }
    
    
}
