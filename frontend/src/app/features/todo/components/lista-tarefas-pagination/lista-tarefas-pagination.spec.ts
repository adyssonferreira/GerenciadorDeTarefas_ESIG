import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasPagination } from './lista-tarefas-pagination';

describe('ListaTarefasPagination', () => {
  let component: ListaTarefasPagination;
  let fixture: ComponentFixture<ListaTarefasPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTarefasPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTarefasPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
