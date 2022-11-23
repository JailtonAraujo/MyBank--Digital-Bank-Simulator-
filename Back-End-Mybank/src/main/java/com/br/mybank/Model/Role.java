package com.br.mybank.Model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority{
	
	private int id;
	
	private String name;

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.name;
	}

}
