const pool = require('../database/db')

async function last(_req, res) {
  try {
    const result = await pool.query(
      `SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1`
    )
    if (result.rowCount == 0) {
      return res.status(404).json({ error: 'Nenhum concurso encontrado' })
    } else {
      return res.status(200).json(result.rows[0])
    }
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message })
  }
}

async function getConcurso(req, res) {
  try {
    const { concurso } = req.params
    if (/^\d+$/.test(concurso) == false) {
      return res
        .status(400)
        .json({ error: 'Concurso deve ser um número inteiro' })
    }
    const result = await pool.query(
      `SELECT * FROM megasena WHERE concurso = $1`,
      [concurso]
    )
    if (result.rowCount == 0) {
      return res.status(404).json({ error: 'Concurso não encontrado' })
    } else {
      return res.status(200).json(result.rows[0])
    }
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message })
  }
}

async function conferirPalpite(req, res) {
  const { numeros } = req.query
  const numerosString = numeros
    .replace(/[^\d,]/g, '')
    .replace(/,+/g, ',')
    .split(',')

  const palpite = []
  for (const nro of numerosString) {
    if (Number(nro) >= 1 && Number(nro) <= 60) {
      palpite.push(Number(nro))
    }
  }
  if (palpite.length < 6 || palpite.length > 12) {
    return res.status(400).json({
      error: 'Palpite deve conter de 6 a 12 dezenas com valores de 1 a 60'
    })
  }

  const acertos = {
    '4_acertos': 0,
    '5_acertos': 0,
    '6_acertos': 0
  }

  try {
    const result = await pool.query(
      `
        SELECT concurso, bola1, bola2, bola3, bola4, bola5, bola6 FROM megasena
      `
    )

    for (const concurso of result.rows) {
      const dezenas = [
        concurso.bola1,
        concurso.bola2,
        concurso.bola3,
        concurso.bola4,
        concurso.bola5,
        concurso.bola6
      ]
      let acertosConcurso = 0
      for (const nro of dezenas) {
        for (const nroPalpite of palpite) {
          if (nro == nroPalpite) {
            acertosConcurso++
          }
        }
      }

      if (acertosConcurso == 4) {
        acertos['4_acertos']++
      } else if (acertosConcurso == 5) {
        acertos['5_acertos']++
      } else if (acertosConcurso == 6) {
        acertos['6_acertos']++
      }
    }

    res.json({
      palpite,
      concursos_consultados: result.rowCount,
      concursos_com_4_acertos: acertos['4_acertos'],
      concursos_com_5_acertos: acertos['5_acertos'],
      concursos_com_6_acertos: acertos['6_acertos']
    })
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }

  res.json({ palpite })
}

module.exports = { last, getConcurso, conferirPalpite }
