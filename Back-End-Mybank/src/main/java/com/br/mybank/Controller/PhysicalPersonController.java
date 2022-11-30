package com.br.mybank.Controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.mybank.DTO.AccountDTO;
import com.br.mybank.DTO.AuthDTO;
import com.br.mybank.DTO.PhysicalPersonDTO;
import com.br.mybank.Model.Account;
import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Service.PhysicalPersonService;
import com.br.mybank.exception.AlreadyExistsCPFException;

@RestController
@RequestMapping("/physical-person")
public class PhysicalPersonController {

    @Autowired
    protected PhysicalPersonService physicalPersonService;

    @PostMapping(value = "/verifyifexistscpf")
    public ResponseEntity<String> verifyIfExistsCpf(@RequestBody PhysicalPerson person) throws AlreadyExistsCPFException {

        if (this.physicalPersonService.verifyIfExistsCpf(person.getCpf())) {
            throw new AlreadyExistsCPFException("CPF Already exists!");
        } else {
            return new ResponseEntity<String>(HttpStatus.OK);
        }
    }
    
    

    @PostMapping(value = "/savings-account")
    public ResponseEntity<AuthDTO> registerNewPersonAndSavingsAccount(@RequestBody PhysicalPerson physicalPerson) throws SQLIntegrityConstraintViolationException {

        if (this.physicalPersonService.verifyIfExistsCpf(physicalPerson.getCpf())) {
            throw new SQLIntegrityConstraintViolationException("CPF already exists!");
        } else {

            return ResponseEntity.ok(this.physicalPersonService.registerNewPerson(physicalPerson));
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<PhysicalPersonDTO>> findByName(@PathVariable(name = "name") String name) {

        return ResponseEntity.ok(physicalPersonService.findByName(name));
    }
    
    

    @GetMapping("/{id}")
    public ResponseEntity<PhysicalPersonDTO> findById( @PathVariable(name = "id") Long id) {

        Optional<PhysicalPerson> optional = physicalPersonService.findById(id);

        if(!optional.isPresent()){
            throw new NoResultException("no person found.");
        }

        PhysicalPersonDTO dto = new PhysicalPersonDTO(optional.get());

        return ResponseEntity.ok(dto);
    }

    
    
    @PostMapping("/find/account")
    public ResponseEntity<PhysicalPersonDTO> findUserByAccount(@RequestBody Account account) throws Exception {
        return ResponseEntity.ok(physicalPersonService.findByAccount(account).get());
    }

}
