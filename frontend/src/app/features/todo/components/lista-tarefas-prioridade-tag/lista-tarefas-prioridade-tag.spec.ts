import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasPrioridadeTag } from './lista-tarefas-prioridade-tag';

describe('ListaTarefasPrioridadeTag', () => {
  let component: ListaTarefasPrioridadeTag;
  let fixture: ComponentFixture<ListaTarefasPrioridadeTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTarefasPrioridadeTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTarefasPrioridadeTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
