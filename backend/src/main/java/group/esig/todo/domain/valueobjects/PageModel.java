package group.esig.todo.domain.valueobjects;

import org.springframework.data.domain.Page;

import java.util.List;

public record PageModel<T>(
        List<T> items,
        long size,
        long number,
        long totalElements,
        long totalPages) {

    public static <T> PageModel<T> of(Page<T> page) {
        return new PageModel<>(
                page.getContent(),
                page.getSize(),
                page.getNumber(),
                page.getTotalElements(),
                page.getTotalPages());
    }
}
