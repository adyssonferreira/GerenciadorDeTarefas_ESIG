package group.esig.todo.infrastructure.persistence.repositories.jpa;

import group.esig.todo.infrastructure.persistence.entities.TarefaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TarefaRepositoryJpa extends JpaRepository<TarefaEntity, UUID> {
}