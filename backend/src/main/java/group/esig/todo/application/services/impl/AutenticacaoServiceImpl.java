package group.esig.todo.application.services.impl;

import group.esig.todo.application.dto.AutenticacaoResponseDTO;
import group.esig.todo.application.dto.LoginRequestDTO;
import group.esig.todo.application.services.AutenticacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AutenticacaoServiceImpl implements AutenticacaoService {

    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Override
    public AutenticacaoResponseDTO autenticar(LoginRequestDTO dto) {
        var authentication = new UsernamePasswordAuthenticationToken(dto.usernameOrEmail(), dto.senha());
        authManager.authenticate(authentication);

        UserDetails user = userDetailsService.loadUserByUsername(dto.usernameOrEmail());
        String[] tokenKit = jwtService.generateToken(user);

        return new AutenticacaoResponseDTO(tokenKit[0], tokenKit[1]);
    }
}
