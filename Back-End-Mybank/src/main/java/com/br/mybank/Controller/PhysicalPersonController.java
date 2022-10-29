package com.br.mybank.Controller;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Service.PhysicalPersonService;

@RestController
@RequestMapping("/physicalperson")
public class PhysicalPersonController {

	@Autowired
	protected PhysicalPersonService physicalPersonService;
	
	@PostMapping(value = "/verifyifexistscpf")
	public ResponseEntity<String> verifyIfExistsCpf( @RequestBody PhysicalPerson person ){
		
		if(this.physicalPersonService.verifyIfExistsCpf(person.getCpf())) {
			return new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE);
		}else {
			return ResponseEntity.ok(person.getCpf());
		}
	}
	
	@PostMapping(value="/savings-account")
	public ResponseEntity<PhysicalPerson> registerNewPersonAndSavingsAccount(@RequestBody PhysicalPerson physicalPerson ) throws SQLIntegrityConstraintViolationException{
		
		if(this.physicalPersonService.verifyIfExistsCpf(physicalPerson.getCpf())) {
			throw new SQLIntegrityConstraintViolationException("CPF already exists!");
		}else {
			return ResponseEntity.ok(this.physicalPersonService.registerNewPerson(physicalPerson));
		}
	}
	
}
