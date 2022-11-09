package com.br.mybank.Controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;

import com.br.mybank.DTO.PersonDTO;
import com.br.mybank.DTO.PhysicalPersonDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import com.br.mybank.DTO.AccountDTO;
import com.br.mybank.Model.PhysicalPerson;
import com.br.mybank.Service.PhysicalPersonService;

import javax.persistence.NoResultException;

@RestController
@RequestMapping("/physical-person")
public class PhysicalPersonController {

    @Autowired
    protected PhysicalPersonService physicalPersonService;

    @PostMapping(value = "/verifyifexistscpf")
    public ResponseEntity<String> verifyIfExistsCpf(@RequestBody PhysicalPerson person) {

        if (this.physicalPersonService.verifyIfExistsCpf(person.getCpf())) {
            return new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE);
        } else {
            return new ResponseEntity<String>(HttpStatus.OK);
        }
    }

    @PostMapping(value = "/savings-account")
    public ResponseEntity<AccountDTO> registerNewPersonAndSavingsAccount(@RequestBody PhysicalPerson physicalPerson) throws SQLIntegrityConstraintViolationException {

        if (this.physicalPersonService.verifyIfExistsCpf(physicalPerson.getCpf())) {
            throw new SQLIntegrityConstraintViolationException("CPF already exists!");
        } else {

            AccountDTO accountDTO = new AccountDTO(this.physicalPersonService.registerNewPerson(physicalPerson).getAccount());

            return ResponseEntity.ok(accountDTO);
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

}
