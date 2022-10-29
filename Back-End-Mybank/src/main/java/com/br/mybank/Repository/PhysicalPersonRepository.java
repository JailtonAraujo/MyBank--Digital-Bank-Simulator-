package com.br.mybank.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.mybank.Model.PhysicalPerson;

@Repository
public interface PhysicalPersonRepository extends JpaRepository<PhysicalPerson, Long>{

	@Query(value = "select count(1) > 0 from tbl_physicalperson where cpf = ?1")
	public Boolean verifyIfExistsCpf (String cpf);
}
