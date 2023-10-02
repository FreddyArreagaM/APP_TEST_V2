import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css']
})
export class VerCuestionarioComponent implements OnInit{
  id: string;
  loading= false;
  cuestionario: Cuestionario | undefined;

  constructor(private _quizz: QuizzService, private aroute: ActivatedRoute){
    this.id = this.aroute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.obtenerQuizz();
  }

  //Metodo para obtener cuestionario
  obtenerQuizz(){
    this.loading = true;
    this._quizz.getCuestionarioById(this.id).subscribe(doc=>{
      this.cuestionario = doc.data();
      this.loading = false;
    }, error =>{
      this.loading = false;
      console.log(error);
    })
  }
}
