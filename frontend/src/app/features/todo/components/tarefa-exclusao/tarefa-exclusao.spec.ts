import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaExclusao } from './tarefa-exclusao';

describe('TarefaExclusao', () => {
  let component: TarefaExclusao;
  let fixture: ComponentFixture<TarefaExclusao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaExclusao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaExclusao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
