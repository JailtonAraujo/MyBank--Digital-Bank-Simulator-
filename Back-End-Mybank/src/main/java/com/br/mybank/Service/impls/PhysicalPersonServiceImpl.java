package com.br.mybank.Service.impls;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.br.mybank.DTO.AuthDTO;
import com.br.mybank.DTO.PhysicalPersonDTO;
import com.br.mybank.Model.Account;
import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Repository.PhysicalPersonCustomRepository;
import com.br.mybank.Repository.PhysicalPersonRepository;
import com.br.mybank.Service.PhysicalPersonService;
import com.br.mybank.Service.SavingsAccountService;

@Service
public class PhysicalPersonServiceImpl implements PhysicalPersonService{
	
	@Autowired
	protected PhysicalPersonRepository physicalPersonRepository;
	
	@Autowired
	protected SavingsAccountService savingsAccountService;

	@Autowired
	protected PhysicalPersonCustomRepository personCustomRepository;
	
	@Value("${jwt.secret}")
	private String SECRET;
	
	
	private final PasswordEncoder encoder;
	
	public PhysicalPersonServiceImpl ( PasswordEncoder encoder) {
		this.encoder = encoder;
	}


	@Override
	@Transactional(rollbackFor = {Exception.class, SQLException.class})
	public AuthDTO registerNewPerson(PhysicalPerson physicalPerson) {
		
		physicalPerson.setAccount(savingsAccountService.generateNewAccount());
		physicalPerson.getAccount().setPerson(physicalPerson);
		
		final String username = physicalPerson.getAccount().getAgencia()
				+""+physicalPerson.getAccount().getConta()
				+""+physicalPerson.getAccount().getDigito();
		
		physicalPerson.getAddress().setPerson(physicalPerson);
		
		physicalPerson.setUsername(username);
		physicalPerson.setPassword( encoder.encode( physicalPerson.getPassword() ));
		
	
		return this.gerateToken(physicalPersonRepository.save(physicalPerson).getId());
	}
	
	
	

	@Override
	public List<PhysicalPersonDTO> findByName(String name) {

		return personCustomRepository.findByName(name);
	}
	
	

	@Override
	public Optional<PhysicalPerson> findById(Long personId) {

		return physicalPersonRepository.findById(personId);
	}
	
	

	@Override
	public Optional<PhysicalPersonDTO> findByAccount(Account account) throws Exception {
		return Optional.of(personCustomRepository.findByAccount(account));
	}
	
	

	@Override
	public Boolean verifyIfExistsCpf(String cpf) {
		
		if(physicalPersonRepository.verifyIfExistsCpf(cpf)) {
			return true;//if already exists CPF return true//
		}else {
			return false;// if not exists CPF return false//
		}

	}
	
	private AuthDTO gerateToken(Long userId) {

		String token = JWT.create().withSubject(userId.toString())
				.withExpiresAt(new Date(System.currentTimeMillis() + 86400000)).sign(Algorithm.HMAC512(SECRET));

		AuthDTO authDTO = personCustomRepository.findUserById(userId);
		authDTO.setToken("Bearer " + token);
		
		return authDTO;
	}
	
	

}
