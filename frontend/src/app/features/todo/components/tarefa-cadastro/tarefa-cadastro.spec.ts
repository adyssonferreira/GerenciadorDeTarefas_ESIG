import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaCadastro } from './tarefa-cadastro';

describe('TarefaCadastro', () => {
  let component: TarefaCadastro;
  let fixture: ComponentFixture<TarefaCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
