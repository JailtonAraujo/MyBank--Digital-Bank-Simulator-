package com.br.mybank.Service.impls;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Repository.PhysicalPersonRepository;
import com.br.mybank.Security.UserDatailsData;


@Component
public class ImplUserDatailsService implements UserDetailsService{
	
	
	private final PhysicalPersonRepository personRepository;
	
	public ImplUserDatailsService(PhysicalPersonRepository personRepository) {
		this.personRepository = personRepository;
	}
		

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<PhysicalPerson> optional = personRepository.findByUsername(username);
		
		
		if(optional.isEmpty() || !optional.isPresent()) {
			throw new UsernameNotFoundException("User ["+username+"] not Found!");
		}
		
		
		return new UserDatailsData(optional);
	}

}
