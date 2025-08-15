import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaEdicao } from './tarefa-edicao';

describe('TarefaEdicao', () => {
  let component: TarefaEdicao;
  let fixture: ComponentFixture<TarefaEdicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaEdicao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaEdicao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
