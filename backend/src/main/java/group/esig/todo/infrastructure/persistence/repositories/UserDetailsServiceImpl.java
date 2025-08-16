package group.esig.todo.infrastructure.persistence.repositories;

import group.esig.todo.infrastructure.persistence.repositories.jpa.UsuarioRepositoryJpa;
import group.esig.todo.presentation.web.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepositoryJpa repositoryJpa;
    private static final String DEFAULT_USER_AUTHORITY = "USER";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var usuario = repositoryJpa.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("Usuário", "email", username));

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getHashSenha(),
                List.of(new SimpleGrantedAuthority(DEFAULT_USER_AUTHORITY))
        );
    }
}
