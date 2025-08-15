import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasGrid } from './lista-tarefas-grid';

describe('ListaTarefasGrid', () => {
  let component: ListaTarefasGrid;
  let fixture: ComponentFixture<ListaTarefasGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTarefasGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTarefasGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
