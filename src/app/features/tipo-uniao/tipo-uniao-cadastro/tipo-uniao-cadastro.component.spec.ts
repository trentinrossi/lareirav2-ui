import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUniaoCadastroComponent } from './tipo-uniao-cadastro.component';

describe('TipoUniaoCadastroComponent', () => {
  let component: TipoUniaoCadastroComponent;
  let fixture: ComponentFixture<TipoUniaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoUniaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUniaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
