package com.br.mybank.Security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.br.mybank.DTO.AuthDTO;
import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Repository.PhysicalPersonCustomRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private final AuthenticationManager authenticationManager;
	
	
	private final PhysicalPersonCustomRepository customRepository;
	
	private final String SECRET;
	
	private long TOKEN_EXPIRATION = 86400000;
	
	
	public JWTAuthenticationFilter (AuthenticationManager authenticationManager,
			PhysicalPersonCustomRepository customRepository, String secret) {
		
		this.authenticationManager = authenticationManager;
		this.customRepository = customRepository;
		this.SECRET = secret;
	}
	
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		try {
			
			PhysicalPerson person = new ObjectMapper().readValue(request.getInputStream(), PhysicalPerson.class);
			
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(person.getUsername(),person.getPassword(), new ArrayList<>()));
			
			
		} catch (Exception e) {
			
			throw new RuntimeException("Error authentication user",e);
		}
		
	}
	
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
	
		UserDatailsData userDatailsData = (UserDatailsData) authResult.getPrincipal();
		
		String token = JWT.create()
						.withSubject(userDatailsData.getId())
						.withExpiresAt(new Date(System.currentTimeMillis()+TOKEN_EXPIRATION))
						.sign(Algorithm.HMAC512(SECRET));
		
		AuthDTO authDTO = customRepository.findUserById(Long.parseLong(userDatailsData.getId()));
		authDTO.setToken("Bearer "+token);
		
		response.getWriter().write(new ObjectMapper().writeValueAsString(authDTO));
		response.getWriter().flush();
						
	}
	
	
}
