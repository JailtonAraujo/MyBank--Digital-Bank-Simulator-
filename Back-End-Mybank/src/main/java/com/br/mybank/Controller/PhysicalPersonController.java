package com.br.mybank.Controller;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.mybank.DTO.AccountDTO;
import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Service.PhysicalPersonService;

@RestController
@RequestMapping("/physical-person")
public class PhysicalPersonController {

	@Autowired
	protected PhysicalPersonService physicalPersonService;
	
	@PostMapping(value = "/verifyifexistscpf")
	public ResponseEntity<String> verifyIfExistsCpf( @RequestBody PhysicalPerson person ){
		
		if(this.physicalPersonService.verifyIfExistsCpf(person.getCpf())) {
			return new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE);
		}else {
			return new ResponseEntity<String>(HttpStatus.OK);
		}
	}
	
	@PostMapping(value="/savings-account")
	public ResponseEntity<AccountDTO> registerNewPersonAndSavingsAccount(@RequestBody PhysicalPerson physicalPerson ) throws SQLIntegrityConstraintViolationException{
		
		if(this.physicalPersonService.verifyIfExistsCpf(physicalPerson.getCpf())) {
			throw new SQLIntegrityConstraintViolationException("CPF already exists!");
		}else {
			
			AccountDTO accountDTO = new AccountDTO(this.physicalPersonService.registerNewPerson(physicalPerson).getAccount());
			
			return ResponseEntity.ok(accountDTO);
		}
	}
	
}
