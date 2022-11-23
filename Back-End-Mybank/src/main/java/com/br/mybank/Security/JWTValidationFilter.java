package com.br.mybank.Security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTValidationFilter extends BasicAuthenticationFilter{
	
	private static final String HEADER_KEY = "Authorization";
	
	private static final String TOKEN_PREFIX ="Bearer ";
	
	private final String SECRET;

	public JWTValidationFilter(AuthenticationManager authenticationManager, String secret) {
		super(authenticationManager);
		this.SECRET = secret;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		String token = request.getHeader(HEADER_KEY);
		
		if(token == null || token.trim().isEmpty() || !token.startsWith(TOKEN_PREFIX)) {
			
			chain.doFilter(request, response);
			return;
			
		}
		
		String tokenClear = token.replace(TOKEN_PREFIX,"");
		
		UsernamePasswordAuthenticationToken authenticationToken = getAuthenticationToken(tokenClear);
		
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		
		chain.doFilter(request, response);
		
	}
	
	
	private UsernamePasswordAuthenticationToken getAuthenticationToken (String token) {
		
		String id = JWT.require(Algorithm.HMAC512(SECRET))
				.build().verify(token).getSubject();
		
		if(id == null) {
			return null;
		}
		
		return new UsernamePasswordAuthenticationToken(id, null, new ArrayList<>());
		
	}

}
