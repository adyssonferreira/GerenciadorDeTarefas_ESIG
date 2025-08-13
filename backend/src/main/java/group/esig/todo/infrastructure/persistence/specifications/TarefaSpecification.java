package group.esig.todo.infrastructure.persistence.specifications;

import group.esig.todo.application.dto.TarefaQueryDTO;
import group.esig.todo.infrastructure.persistence.entities.TarefaEntity;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class TarefaSpecification {
    public Specification<TarefaEntity> build(TarefaQueryDTO dto) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (Objects.nonNull(dto.termo()) && !dto.termo().isBlank()) {
                List<Predicate> orPredicates = new ArrayList<>();

                orPredicates.add(
                        builder.like(
                                builder.lower(root.get("titulo")),
                                "%" + dto.termo().toLowerCase().trim() + "%"));

                orPredicates.add(
                        builder.like(
                                builder.lower(root.get("descricao")),
                                "%" + dto.termo().toLowerCase().trim() + "%"));

                predicates.add(builder.or(orPredicates.toArray(new Predicate[0])));
            }

            if (Objects.nonNull(dto.status())) {
                predicates.add(builder.equal(root.get("status"), dto.status()));
            }

            if (Objects.nonNull(dto.prioridade())) {
                predicates.add(builder.equal(root.get("prioridade"), dto.prioridade()));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
