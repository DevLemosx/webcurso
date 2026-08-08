-- ============================================================
-- DevLemosx — Recuperar tecnologias que ficaram só em "tags"
-- (cursos migrados antes de existir a coluna "tecnologias")
-- ============================================================

-- Mostra quem vai ser afetado (opcional, só conferir antes)
select nome, tecnologia, tecnologias, tags
from public.cursos
where exists (
  select 1 from unnest(tags) as t
  where t = any(array['HTML','CSS','JavaScript','Python','PHP','SQL','Java','Git','Lógica'])
  and not (t = any(coalesce(tecnologias, '{}')))
);

-- Corrige: junta tecnologias que já existem + qualquer tag que seja
-- uma categoria válida de filtro e ainda não esteja em "tecnologias"
update public.cursos
set tecnologias = (
  select array_agg(distinct valor)
  from unnest(
    array_cat(
      coalesce(tecnologias, '{}'::text[]),
      coalesce(
        (select array_agg(t) from unnest(tags) as t
         where t = any(array['HTML','CSS','JavaScript','Python','PHP','SQL','Java','Git','Lógica'])),
        '{}'::text[]
      )
    )
  ) as valor
);

-- Confira o resultado (o curso de HTML5+CSS3 já deve mostrar os dois):
-- select nome, tecnologia, tecnologias from public.cursos where nome ilike '%HTML5%';
