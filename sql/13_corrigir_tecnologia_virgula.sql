-- ============================================================
-- DevLemosx — Corrigir cursos com "tecnologia" preenchida com
-- vírgula (ex: "HTML, CSS") em vez de usar o array "tecnologias"
-- ============================================================

-- Mostra quais linhas estão erradas antes de corrigir (opcional, só conferir)
select id, nome, tecnologia, tecnologias
from public.cursos
where tecnologia like '%,%';

-- Corrige: separa pela vírgula, tira espaço em branco,
-- põe tudo em "tecnologias" (array) e deixa só a primeira em "tecnologia"
update public.cursos
set
  tecnologias = (
    select array_agg(trim(pedaco))
    from unnest(string_to_array(tecnologia, ',')) as pedaco
  ),
  tecnologia = trim(split_part(tecnologia, ',', 1))
where tecnologia like '%,%';

-- Confira o resultado:
-- select id, nome, tecnologia, tecnologias from public.cursos;
