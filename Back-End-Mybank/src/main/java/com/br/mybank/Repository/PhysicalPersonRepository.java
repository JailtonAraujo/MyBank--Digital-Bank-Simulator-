package com.br.mybank.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.mybank.Model.PhysicalPerson;

@Repository
public interface PhysicalPersonRepository extends JpaRepository<PhysicalPerson, Long>{

	@Query(value = "select count(1) > 0 from tbl_physicalperson where cpf = ?1")
	public Boolean verifyIfExistsCpf (String cpf);

	@Query(value = "select p.name, p.id from tbl_physicalperson p where p.name like ?1%")
	public PhysicalPerson findByName(String name);
	
	@Query(value = "select p from tbl_physicalperson p where p.username = ?1")
	public Optional<PhysicalPerson> findByUsername(String username);
}
