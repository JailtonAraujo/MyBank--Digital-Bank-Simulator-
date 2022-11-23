package com.br.mybank.Security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.br.mybank.Model.PhysicalPerson;

public class UserDatailsData implements UserDetails{
	
	private static final long serialVersionUID = 1L;
	
	private  final Optional<PhysicalPerson> person;
	
	public UserDatailsData(Optional<PhysicalPerson> person) {
		this.person = person;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return new ArrayList<>();
	}

	@Override
	public String getPassword() {
		
		return this.person.orElse(new PhysicalPerson()).getPassword();
	}

	@Override
	public String getUsername() {

		return this.person.orElse(new PhysicalPerson()).getUsername();
	}
	
	public String getId() {
		return this.person.orElse(new PhysicalPerson()).getId().toString();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
