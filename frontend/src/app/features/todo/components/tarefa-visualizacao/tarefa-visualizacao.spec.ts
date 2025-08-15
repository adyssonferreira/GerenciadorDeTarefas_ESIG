import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaVisualizacao } from './tarefa-visualizacao';

describe('TarefaVisualizacao', () => {
  let component: TarefaVisualizacao;
  let fixture: ComponentFixture<TarefaVisualizacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaVisualizacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaVisualizacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
