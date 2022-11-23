package com.br.mybank.Security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.br.mybank.Repository.PhysicalPersonCustomRepository;
import com.br.mybank.Service.impls.ImplUserDatailsService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	
	private final ImplUserDatailsService implUserDatailsService;
	
	private final PhysicalPersonCustomRepository physicalPersonCustomRepository;
	
	@Value("${jwt.secret}")
	private String SECRET;
	
	private String [] uriAuthorized = {"/physical-person/**","/savings-account/exists"};
	
    public SecurityConfig(ImplUserDatailsService implUserDatailsService, PhysicalPersonCustomRepository physicalPersonCustomRepository) {
    	
    	this.implUserDatailsService = implUserDatailsService;
    	this.physicalPersonCustomRepository = physicalPersonCustomRepository;
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    	
    	auth.userDetailsService(implUserDatailsService).passwordEncoder(new BCryptPasswordEncoder());
    	
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	
    	http.authorizeRequests()
    	.antMatchers(HttpMethod.POST,"/login").permitAll()
    	.antMatchers(uriAuthorized).permitAll()
    	.anyRequest().authenticated()
    	
    	.and().cors().and().csrf().disable()
    	.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    	
    	.and()
    	.addFilter(new JWTAuthenticationFilter(authenticationManager(), physicalPersonCustomRepository, SECRET))
    	
    	.addFilter(new JWTValidationFilter(authenticationManager(), SECRET));
    	
    }
	
}
