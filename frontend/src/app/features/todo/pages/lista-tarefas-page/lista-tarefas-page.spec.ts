import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasPage } from './lista-tarefas-page';

describe('ListaTarefasPage', () => {
  let component: ListaTarefasPage;
  let fixture: ComponentFixture<ListaTarefasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTarefasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
