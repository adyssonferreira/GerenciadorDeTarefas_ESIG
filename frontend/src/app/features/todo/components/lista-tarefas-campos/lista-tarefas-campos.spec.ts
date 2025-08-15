import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasCampos } from './lista-tarefas-campos';

describe('ListaTarefasCampos', () => {
  let component: ListaTarefasCampos;
  let fixture: ComponentFixture<ListaTarefasCampos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTarefasCampos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTarefasCampos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
