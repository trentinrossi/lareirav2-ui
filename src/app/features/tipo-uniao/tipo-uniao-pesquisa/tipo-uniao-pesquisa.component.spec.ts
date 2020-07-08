import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUniaoPesquisaComponent } from './tipo-uniao-pesquisa.component';

describe('TipoUniaoPesquisaComponent', () => {
  let component: TipoUniaoPesquisaComponent;
  let fixture: ComponentFixture<TipoUniaoPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoUniaoPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUniaoPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
