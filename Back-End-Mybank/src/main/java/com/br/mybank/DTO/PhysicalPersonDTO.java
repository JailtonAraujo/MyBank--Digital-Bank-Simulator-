package com.br.mybank.DTO;


import com.br.mybank.Model.Person;
import com.br.mybank.Model.PhysicalPerson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalPersonDTO implements Serializable {

    private static final long serialVersionUID = -4682309094696387930L;

    private Long id;

    private String name;

    private String lastname;

    private AccountDTO account;

    private String cpf;

    public PhysicalPersonDTO(PhysicalPerson person) {
        this.id = person.getId();
        this.name = person.getName();
        this.lastname = person.getLastname();
        this.cpf = person.getCpf();
        this.account = new AccountDTO(person.getAccount());
    }
}
